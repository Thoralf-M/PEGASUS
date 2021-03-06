import extensionizer from 'extensionizer'
import { Mutex } from 'async-mutex'

class PopupController {
  constructor() {
    this.popup = null

    this.mutex = new Mutex()
  }

  async openPopup() {
    const release = await this.mutex.acquire()

    if (this.popup && (await this.updatePopup())) {
      release()
      return
    }

    // NOTE: release mutex if user closes the popup
    extensionizer.runtime.onConnect.addListener(port => {
      port.onDisconnect.addListener(() => {
        this.popup = null
        release()
      })
    })

    return extensionizer.windows.create(
      {
        url: 'packages/popup/build/index.html',
        type: 'popup',
        width: 380,
        height: 620,
        left: 25,
        top: 25
      },
      window => {
        this.popup = window
        release()
      }
    )
  }

  closePopup() {
    if (!this.popup) return

    extensionizer.windows.remove(this.popup.id)
    this.popup = null
  }

  updatePopup() {
    return new Promise(resolve => {
      extensionizer.windows.update(this.popup.id, { focused: true }, window => {
        resolve(Boolean(window))
      })
    })
  }
}

export default PopupController
