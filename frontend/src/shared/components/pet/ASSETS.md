# Arte da coruja

O personagem é um sprite vetorial desenhado sobre uma grade de pixels, inspirado na referência de coruja azul fornecida para o Nimbo. As penas, rosto, asas, cachecol, acessórios e equipamentos são camadas independentes. Os pixels permanecem nítidos com `shapeRendering="crispEdges"` e movimentos em passos. O sprite é local, sem carregar imagens de terceiros.

Arquivos principais:

- `PixelOwl.jsx`: corpo, penas, asas, bolsa, cachecol e efeitos de humor.
- `PixelOwlFace.jsx`: olhos, piscadas, bico e expressões.
- `OwlEquipment.jsx`: equipamentos dos três caminhos e acessórios opcionais.
- `owlAppearance.js`: cores, opções do editor e nomes das classes para prévias.
- `petMotion.js`: animações e preferência por movimento reduzido.

## Conjuntos avaliados em 20/11/2026

- [Tiny Dungeon — Kenney](https://kenney-assets.itch.io/tiny-dungeon): gratuito, CC0, com personagens, itens e armas em tiles de 16 × 16. A licença permite o uso em projetos comerciais. É uma alternativa para ícones de inventário, mas não fornece a coruja em camadas nem a proporção da referência. Não foi incorporado nesta versão.
- [Owlpack — SeethingSwarm](https://seethingswarm.itch.io/owlpack): coruja com animações, porém pago e com restrição à distribuição dos arquivos individuais. Não foi incorporado.

A versão usa a arte em código para manter o visual da referência, permitir recoloração e combinar acessórios sem depender de um pacote externo. Nenhum arquivo dos conjuntos pesquisados está incluído no repositório.
