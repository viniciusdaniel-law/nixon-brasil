# Tradução de vídeo — Nixon Brasil

## Ferramentas

- `yt-dlp`: obtenção do arquivo quando a fonte e os direitos permitirem.
- `ffmpeg`: extração de áudio, corte, normalização e exportação.
- `whisper.cpp`: transcrição local.
- `Subtitle Edit` ou `Aegisub`: revisão, sincronização e quebra de legendas.
- `Kdenlive`: montagem, cartelas, créditos e exportação vertical/horizontal.

## Fluxo de trabalho

1. Registrar URL, título, data, titular, licença e permissão de reutilização.
2. Baixar a melhor fonte disponível sem remover marcas ou créditos do original.
3. Extrair áudio WAV mono a 16 kHz para transcrição.
4. Gerar transcrição automática e revisar manualmente nomes, cargos, lugares e termos históricos.
5. Traduzir para português brasileiro preservando registro, ironia e ambiguidade.
6. Quebrar legendas em até duas linhas, com leitura confortável em tela móvel.
7. Exportar `SRT` e uma cópia com legendas incorporadas.
8. Inserir cartela final com fonte, data, identificação do acervo e indicação de tradução editorial.
9. Publicar um trecho nas redes e manter no site o contexto, a fonte e a transcrição maior.

## Comandos-base

```bash
# Extrair áudio
ffmpeg -i video.mp4 -vn -ac 1 -ar 16000 audio.wav

# Transcrever com whisper.cpp
whisper-cli -m models/ggml-medium.en.bin -f audio.wav -osrt -otxt

# Incorporar legendas
ffmpeg -i video.mp4 -vf "subtitles=legenda-ptbr.srt" -c:a copy video-ptbr.mp4

# Gerar versão vertical 1080 × 1920 com enquadramento central
ffmpeg -i video.mp4 -vf "scale=-2:1920,crop=1080:1920" -c:a aac -b:a 192k reel.mp4
```

## Direitos

Prioridade: gravações produzidas pelo governo federal dos Estados Unidos e identificadas como domínio público; material explicitamente licenciado; ou conteúdo autorizado por escrito. Crédito não substitui autorização para vídeos protegidos de emissoras, produtoras ou da Foundation.

## Padrão de legenda

- Português brasileiro natural.
- Sem tradução palavra por palavra.
- Nomes próprios conferidos contra a transcrição oficial.
- Aspas apenas para fala literal.
- Paráfrase identificada como resumo editorial.
