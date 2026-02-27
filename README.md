# dittopedia-shared

# Workflow (temporaire) pour mettre à jour le shared :
1. Modifier le code dans dittopedia-shared
2. Bump la version
`npm version patch`

1. Publier
`npm publish --access public`

1. Mettre à jour dans front/back
`cd ../dittopedia-front && bun update @dittopedia/shared`
`cd ../dittopedia-back && bun update @dittopedia/shared`