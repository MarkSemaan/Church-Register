const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {

        mac:{
          "target": [
            {
              "target": "dmg",
              "arch": [
                "universal"
              ]
            }
          ]
        }
      }
    }
  }
})
