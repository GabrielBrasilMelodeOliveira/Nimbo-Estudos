# Arte da coruja

A base do personagem reproduz a referência de coruja azul fornecida pelo usuário para o Nimbo, convertida em geometria vetorial editável sobre uma grade de 51 × 73 pixels. A paleta indexada preserva o contorno, o rosto em três quartos e os detalhes do cachecol e da bolsa da imagem enviada. Não se atribui uma licença de terceiros à referência fornecida. As penas, rosto, asas, cachecol, acessórios e equipamentos são camadas independentes. Os pixels permanecem nítidos com `shapeRendering="crispEdges"` e movimentos em passos. O sprite é local, sem carregar imagens de terceiros.

Arquivos principais:

- `art/owlReferencePixels.js`: geometria da referência separada em camadas e 24 cores.
- `art/referencePalette.js`: recoloração das famílias de penas e cachecol sem alterar os outros materiais.
- `PixelOwl.jsx`: composição, articulações, bolsa, cachecol e efeitos de humor.
- `owlPoses.js`: sete poses por caminho, separadas das animações para preservar a postura da classe.
- `PixelOwlFace.jsx`: olhos, piscadas, bico e expressões.
- `OwlEquipment.jsx`: equipamentos dos três caminhos e acessórios opcionais.
- `owlAppearance.js`: cores, opções do editor e nomes das classes para prévias.
- `petMotion.js`: keyframes de respiração, piscadas e gestos por articulação, mantendo os pivôs das poses.
- `useOwlGesture.js`: sequências embaralhadas sem repetição consecutiva, intervalos variáveis e pausa com aba oculta, personagem fora da tela ou movimento reduzido.

Armaduras, mantos, acessórios e armas são geometria adicional em camadas. O rosto permanece visível; os equipamentos crescem em presença da terceira à sétima classe. Nenhuma imagem remota ou pacote externo é carregado durante o uso.

## Conjuntos avaliados em 20/11/2026

- [Tiny Dungeon — Kenney](https://kenney-assets.itch.io/tiny-dungeon): gratuito, CC0, com personagens, itens e armas em tiles de 16 × 16. A licença permite o uso em projetos comerciais. É uma alternativa para ícones de inventário, mas não fornece a coruja em camadas nem a proporção da referência. Não foi incorporado nesta versão.
- [Owlpack — SeethingSwarm](https://seethingswarm.itch.io/owlpack): coruja com animações, porém pago e com restrição à distribuição dos arquivos individuais. Não foi incorporado.

A versão usa a arte em código para manter o visual da referência, permitir recoloração e combinar acessórios sem depender de um pacote externo. Nenhum arquivo dos conjuntos pesquisados está incluído no repositório.
