export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const { message } = await request.json();

        const result = await env.AI.run(
          "@cf/meta/llama-3.1-8b-instruct",
          {
            messages: [
              {
                role: "system",
                content: "Sen KasımChat adlı yardımcı bir yapay zekâsın. Türkçe, kısa ve anlaşılır cevap ver."
              },
              {
                role: "user",
                content: message
              }
            ]
          }
        );

        return Response.json({
          reply: result.response
        });
      } catch (error) {
        return Response.json(
          { reply: "Bir hata oluştu." },
          { status: 500 }
        );
      }
    }

    return env.ASSETS.fetch(request);
  }
};
