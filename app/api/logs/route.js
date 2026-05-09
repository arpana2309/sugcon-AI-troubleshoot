export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '7d';
    const email = process.env.OPENOBSERVE_EMAIL;
    const token = process.env.OPENOBSERVE_TOKEN;
    const orgId = process.env.OPENOBSERVE_ORG_ID;
    const host = process.env.OPENOBSERVE_HOST;
    const streamName = process.env.OPENOBSERVE_STREAM || 'sitecore_logs';

    console.log('\n========== API LOGS DEBUG ==========');
    console.log('Stream Name:', streamName);
    console.log('Time Range:', timeRange);

    if (!email || !token || !orgId || !host) {
      throw new Error('Missing OpenObserve configuration');
    }

    // Calculate time range in MILLISECONDS (OpenObserve expects milliseconds)
    //const now = Date.now();
      const timeRanges = {
      '1h': 60 * 60 * 1000,
      '6h': 6 * 60 * 60 * 1000,
     '24h': 24 * 60 * 60 * 1000,
     '2d': 2 * 24 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
     '30d': 30 * 24 * 60 * 60 * 1000,
    };
   // const rangeMs = timeRanges[timeRange] || timeRanges['7d'];
   // const startTime = now - rangeMs;  // in milliseconds
    //const endTime = now;  // in milliseconds

    const now = Date.now(); const rangeMs = timeRanges[timeRange] || timeRanges['7d']; // OpenObserve expects MICROSECONDS 
    const startTime = (now - rangeMs) * 1000; 
    const endTime = now * 1000;
    
    
    console.log('Time Calculation:');
    console.log('Now (ms):', now);
    console.log('Start Time (ms):', startTime);
    console.log('End Time (ms):', endTime);

    const credentials = Buffer.from(`${email}:${token}`).toString('base64');
    const url = `${host}/api/${orgId}/${streamName}/_json`;
    //const url = `${host}/api/${orgId}/_search`; 
    console.log('Request URL:', url);

    //const requestBody = {
     // query: {
      //  sql: `SELECT * FROM "${streamName}" ORDER BY _timestamp DESC LIMIT 100`,
       // start_time: startTime,
       // end_time: endTime,
     // },
   // };
    const requestBody = { 
        query: {
             sql: `SELECT * FROM "${streamName}" ORDER BY _timestamp DESC LIMIT 100`,
             start_time: startTime, 
             end_time: endTime, 
            }, 
        };
    console.log('Request Body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error Response:', errorText);
      throw new Error(`OpenObserve returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Raw Response Hits Count:', data.hits?.length || 0);

    if (data.hits && data.hits.length > 0) {
      console.log('First Hit:', JSON.stringify(data.hits[0], null, 2));
    }

    // Filter only error/exception/failure logs
    const errorLogs = (data.hits || [])
      .filter((log) => {
        const level = (log.level || '').toUpperCase();
        const message = (log.message || '').toUpperCase();
        
        return (
          level === 'ERROR' ||
          level === 'CRITICAL' ||
          message.includes('ERROR') ||
          message.includes('EXCEPTION') ||
          message.includes('FAILURE')
        );
      })
      .map((log) => ({
        id: log._id || log.timestamp,
        timestamp: log._timestamp || new Date().toISOString(),
        level: log.level || 'ERROR',
        service: log.service || 'Unknown',
        message: log.message || '',
        details: log.details || null,
      }));

    console.log('✅ Filtered Error Logs Count:', errorLogs.length);
    console.log('========== END DEBUG ==========\n');

    return Response.json({ 
      logs: errorLogs,
      total: errorLogs.length,
      timeRange,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ FATAL ERROR:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}