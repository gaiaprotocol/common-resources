import { exists } from "https://deno.land/std@0.223.0/fs/mod.ts";
import { serveFile } from "https://deno.land/std@0.223.0/http/file_server.ts";
import { corsHeaders } from "https://raw.githubusercontent.com/yjgaia/deno-module/main/api.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("OK", { headers: corsHeaders });
  }

  const basePath = Deno.cwd() + "/public";
  const path = new URL(req.url).pathname;
  const filePath = basePath + path;

  const response = path !== "/" && await exists(filePath)
    ? await serveFile(req, filePath)
    : await serveFile(req, basePath + "/index.html");

  Object.assign(response.headers, corsHeaders);

  return response;
});
