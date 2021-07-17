interface AppConfig {
  basePath: string
  appName: string
}

const config: AppConfig = {
  basePath: Deno.cwd(),
  appName: 'Recipes App',
}

export default config
