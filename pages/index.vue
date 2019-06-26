<template>
  <div class="mp-MainPage">
    <div>
      <div class="mp-MainPage_Section">
        <h2 class="mp-MainPage_Title">
          Test application with SSE notifications
        </h2>
        <p>
          This application connects to a web server and listens notifications(like
          system notifications in many real applications).
        </p>
        <p>
          It supports SSE(server-sent events) and websockets(in progress). But for both
          local server is required. To test without server there is a demo mode, in which
          some random notifications are generated at random time(up to 5 seconds).
        </p>
      </div>

      <div class="mp-MainPage_Section">
        <p>Connection Type:</p>
        <el-radio-group v-model="connectionType">
          <el-radio-button :label="CONNECTION_SSE">
            SSE
          </el-radio-button>
          <el-radio-button
            :disabled="true"
            :label="CONNECTION_WEBSOCKET"
          >
            Websockets
          </el-radio-button>
          <el-radio-button :label="CONNECTION_DEMO">
            Demo(without server)
          </el-radio-button>
        </el-radio-group>
      </div>

      <div class="mp-MainPage_Section">
        <connection-status-indicator
          :is-connected="connectionIsEstablished[connectionType]"
        />
      </div>

      <div class="mp-MainPage_Section">
        <p>Notifications:</p>
        <component
          :is="actionToComponentName[notification.action]"
          v-for="(notification, index) in notifications"
          :key="index"
          :notification="notification"
          class="mp-MainPage_Notification"
          @close="closeNotification(index)"
        />

        <el-alert
          v-if="notifications.length === 0"
          :closable="false"
        >
          There is no notifications.
        </el-alert>
      </div>
    </div>
  </div>
</template>

<script>
import CreatedEvent from 'components/notifications/created-event'
import UpdatedEvent from 'components/notifications/updated-event'
import ConnectionStatusIndicator from 'components/connection-status-indicator'
import demoNotifications from 'utils/demo-notifications'

export default {
  components: {
    CreatedEvent,
    UpdatedEvent,
    ConnectionStatusIndicator
  },
  data() {
    const CONNECTION_SSE = Symbol('sse')
    const CONNECTION_WEBSOCKET = Symbol('websocket')
    const CONNECTION_DEMO = Symbol('demo')

    return {
      eventSource: null,
      notifications: [],
      actionToComponentName: {
        'create_event': 'created-event',
        'update_event': 'updated-event'
      },
      CONNECTION_SSE,
      CONNECTION_WEBSOCKET,
      CONNECTION_DEMO,
      connectionType: CONNECTION_SSE,
      connectionIsEstablished: {
        [CONNECTION_SSE]: false,
        [CONNECTION_WEBSOCKET]: false,
        [CONNECTION_DEMO]: false
      },
      demoTimeoutId: null,
      demoQueue: []
    }
  },
  watch: {
    connectionType: {
      handler(newType, oldType) {
        // destroy old connection
        this.establishOrDestroyConnection(oldType, true)
        // establish new connection
        this.establishOrDestroyConnection(newType, false)
      }
    }
  },
  methods: {
    handleNotification(notification) {
      this.$notify.info({
        title: 'You have a new notification'
      })
      this.notifications.push(notification)
    },

    establishOrDestroyConnection(connectionType, destroy = false) {
      if (!destroy) {
        switch (connectionType) {
          case this.CONNECTION_SSE:
            this.establishSSE()
            break
          case this.CONNECTION_WEBSOCKET:
            this.establishWebsockets()
            break
          case this.CONNECTION_DEMO:
            this.establishDemo()
            break
          default:
            break
        }
      } else {
        switch (connectionType) {
          case this.CONNECTION_SSE:
            this.destroySSE()
            break
          case this.CONNECTION_WEBSOCKET:
            this.destroyWebsockets()
            break
          case this.CONNECTION_DEMO:
            this.destroyDemo()
            break
          default:
            break
        }
      }
    },

    establishSSE() {
      const es = new EventSource('http://localhost:8000/events/')

      es.addEventListener('error', (event) => {
        // eslint-disable-next-line no-console
        console.log('Event Source was closed')
        this.$set(this.connectionIsEstablished, this.CONNECTION_SSE, false)
      }, false)

      es.onopen = () => {
        this.$set(this.connectionIsEstablished, this.CONNECTION_SSE, true)
      }

      es.onmessage = (event) => {
        if (event && event.data) {
          this.handleNotification(JSON.parse(event.data))
        }
      }

      this.eventSource = es
    },

    destroySSE() {
      if (this.eventSource) {
        this.eventSource.close()
      }
      this.$set(this.connectionIsEstablished, this.CONNECTION_SSE, false)
    },

    establishWebsockets() {
      /* TODO: implement websocket connection */
    },

    destroyWebsockets() {
      /* TODO: destroy */
    },

    establishDemo() {
      this.demoHelper()
      this.$set(this.connectionIsEstablished, this.CONNECTION_DEMO, true)
    },

    destroyDemo() {
      window.clearTimeout(this.demoTimeoutId)
      this.demoTimeoutId = null
      this.$set(this.connectionIsEstablished, this.CONNECTION_DEMO, false)
    },

    demoHelper() {
      if (this.demoQueue.length === 0) {
        this.demoQueue = [ ...demoNotifications ]
      }

      const time = Math.random() * 5000
      const notification = this.demoQueue.pop()
      this.handleNotification(notification)
      this.demoTimeoutId = window.setTimeout(this.demoHelper, time)
    },

    closeNotification(index) {
      this.notifications.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.mp-MainPage {
  margin: 0 auto;
  max-width: 1000px;
}

.mp-MainPage_Title {
  color: #606060;
}

.mp-MainPage_Section {
  margin: 1em 0;
}

.mp-MainPage_Notification {
  & + & {
    margin: 0.4em 0;
  }
}
</style>
