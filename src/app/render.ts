import { Response } from 'opine'
import * as eta from 'eta'
import config from '../config.ts'

/**
 * Get file contents from template directory
 *
 * @param {string} templateName
 *
 * @return {Promise<string>}
 */
async function getTemplateContents (templateName: string): Promise<string> {
  const decoder = new TextDecoder('utf-8')
  try {
    const data = await Deno.readFile(
      `${config.basePath}/src/templates/${templateName}.eta`
    )
    return decoder.decode(data)
  } catch (e) {
    return ''
  }
}

/**
 * Render the eta formatted content from templates
 * to the browser
 *
 * @param {string} templateName
 * @param {T} props Data props needed by eta
 * @param {Response<any>} response
 *
 * @return {Promise<string>}
 */
export async function render<T extends object> (
  templateName: string,
  props: T,
  response: Response<any>
): Promise<string> {
  const data: string = await getTemplateContents(templateName)

  if (data === '') {
    response.setStatus(501)
    response.send()
  }

  return eta.render(data, props) as Promise<string>
}
