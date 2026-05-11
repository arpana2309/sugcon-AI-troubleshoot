import express from "express";
import 'dotenv/config';
import { fetchGraphQLSchema, getContext } from "context-service";
import { runValidators } from "validators";
import { runRules } from "rules-engine";
import { runAI } from "ai-client";
const app = express();
app.use(express.json());
app.get("/", (_, res) => {
  res.send("XM Cloud AI Debugger API is running 🚀");
});

app.get("/api/schema", async (_req, res) => {
 try {
   const schema = await fetchGraphQLSchema();
   return res.json({ schema });
 } catch (e: any) {
   return res.status(500).json({ error: e.message });
 }
});

app.post("/api/diagnose", async (req, res) => {
  try {
    const { prompt, query, logs, path } = req.body;

    const context = await getContext({ query, logs, path });
    const validationResults = await runValidators(context);
    const ruleResults = runRules(validationResults);

    const high = ruleResults.find(r => r.confidence > 0.9);
    if (high) {
      return res.json({ source: "rules", result: high });
    }

    const ai = await runAI({ prompt, context, validationResults, ruleResults });
    return res.json({ source: "ai", result: ai });

  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(4000, () => console.log("API running on :4000"));