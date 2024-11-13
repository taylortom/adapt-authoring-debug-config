import { AbstractModule } from 'adapt-authoring-core';
/**
* Adds config utils to the debug panel
* @extends debug
* @extends {AbstractModule}
*/
class DebugConfigModule extends AbstractModule {
  /** @override */
  async init () {
    const [auth, server, ui] = await this.app.waitForModule('auth', 'server', 'ui')
    ui.addUiPlugin(`${this.rootDir}/ui-plugins`)

    server.api.addRoute({
      route: '/debug/config',
      handlers: { put: this.saveData.bind(this) }
    })
    auth.secureRoute('/api/debug/config', 'PUT', ['debug']);
  }

  async saveData (req, res, next) {
    try {
      const config = await this.app.waitForModule('config')
      // Object.entries(req.body).forEach(([key, val]) => config.set(key, val))
      Object.entries(req.body).forEach(([key, val]) => {
        console.log('saveData', key, val)
        // config.set(key, val);
      })
    } catch(e) {
      res.sendError(e)
    }
  }
}

export default DebugConfigModule;