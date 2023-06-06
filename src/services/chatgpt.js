import axios from "axios";
import Audio from "./audio.js";

export default class ChatGPT {
  async api(url, params, headers) {
    return await axios.post(url, params, headers);
  }

  async post(prompt) {
    const options = {
      organization: "org-dG8SjQrlt5RJ9eS24Im4WILy",
      apiKey: process.env.CHATGPT_KEY,
    };

    const url = "https://api.openai.com/v1/chat/completions";

    const params = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    };

    const headers = {
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        "Content-Type": "application/json",
      },
    };
    const response = await this.api(url, params, headers);
    let resposta = response.data.choices[0].message.content;
    const audio = new Audio();
    await audio.textoParaAudio(resposta);
  }
}
