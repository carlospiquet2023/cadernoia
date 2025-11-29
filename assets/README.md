# Assets do Caderno Digital com IA

## Ícones Necessários

Para gerar o instalador, você precisa criar os seguintes ícones:

### icon.ico (Windows)
- Resolução: 256x256 pixels (múltiplas resoluções incluídas)
- Formato: ICO
- Usado no: Instalador e executável

### Gerando o ícone

Você pode usar ferramentas online como:
- https://icoconvert.com/
- https://www.freeconvert.com/png-to-ico

Ou usar o ImageMagick:
```bash
magick convert icon.png -define icon:auto-resize="256,128,64,48,32,16" icon.ico
```

## Arquivos de Ícone Sugeridos

1. `icon.ico` - Ícone principal do Windows (256x256)
2. `icon.png` - Ícone PNG de alta resolução (512x512)
3. `icon-192.png` - Para PWA (192x192)
4. `icon-512.png` - Para PWA (512x512)

## Design Sugerido

O ícone deve representar um caderno digital com elementos de IA:
- Caderno/notebook estilizado
- Cores: Indigo (#6366f1) como cor principal
- Elementos que sugerem inteligência artificial (circuitos, estrelas, etc.)
