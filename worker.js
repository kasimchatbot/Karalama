export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const { mesaj } = await request.json();

        if (!mesaj) {
          return Response.json({ hata: "Mesaj boş." }, { status: 400 });
        }

        const sonuc = await env.AI.run(
          "@cf/meta/llama-3.1-8b-instruct",
          {
            messages: [
              {
                role: "system",
                content: "Sen KasımChat adlı Türkçe konuşan bir yapay zeka asistanısın. Kısa, anlaşılır ve yardımcı cevaplar ver."
              },
              {
                role: "user",
                content: mesaj
              }
            ]
          }
        );

        return Response.json({
          cevap: sonuc.response
        });

      } catch (hata) {
        return Response.json({
          hata: hata.message
        }, { status: 500 });
      }
    }

    return new Response("KasımChat çalışıyor.");
  }
};

