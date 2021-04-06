RegisterLsp('denols', {
  filetypes = { 'typescript' },
  init_options = {
    enable = true,
    unstable = true,
    importMap = './import_map.json'
  },
  root_dir = require 'lspconfig'.util.root_pattern('tsconfig.json', '.git')
})

RegisterLsp('graphql')

require 'diagnosticls-nvim'.setup {
  typescript = {
    linter = require 'diagnosticls-nvim.linters.ts_standard',
    formatter = require 'diagnosticls-nvim.formatters.ts_standard'
  }
}

print('[PROJECTCMD] Loaded!')
