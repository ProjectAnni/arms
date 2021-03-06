import { Allotment } from 'allotment'
import Editor from './components/Editor'
import FileTree from './components/FileTree'
import Terminal from './components/Terminal'
import ToolBar from './components/ToolBar'

function App() {
  return (
    <Allotment>
      {/* left */}
      <Allotment.Pane preferredSize="25%" visible={false}>
        <div>Left</div>
      </Allotment.Pane>

      {/* right */}
      <Allotment.Pane>
        <ToolBar />
        <Allotment vertical>
          {/* top(main) */}
          <Allotment.Pane>
            <Allotment>
              {/* file browser(left) */}
              <Allotment.Pane>
                <Editor />
              </Allotment.Pane>
              {/* file browser(right) */}
              <Allotment.Pane preferredSize="25%">
                <FileTree />
              </Allotment.Pane>
            </Allotment>
          </Allotment.Pane>
          {/* bottom(terminal) */}
          <Allotment.Pane preferredSize="35%">
            <Terminal />
          </Allotment.Pane>
        </Allotment>
      </Allotment.Pane>
    </Allotment>
  )
}

export default App
