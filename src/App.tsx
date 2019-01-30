import { Button, Layout } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import './App.scss'
import { AppState } from './store'
// import { playingActions } from './store/actions'

interface AppProps {
  playing: boolean
}

class App extends React.Component<AppProps> {
  public render() {
    const { Footer, Sider, Content } = Layout
    return (
      <div className="App">
        <Layout>
          <Sider>Sider</Sider>
          <Layout>
            <Content>Content</Content>
            <Footer>
              Footer
              <Button type="primary">Start Playing</Button>
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default connect(({ playing }: AppState) => ({
  playing
}))(App)
