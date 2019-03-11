import { Button, Input, Upload } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { AppState, DispatchProps, mapDispatchToProps } from '../store'
import { fileActions } from '../store/actions'
import { FILE_SUFFIX } from '../store/epic/file.epic'
import { FileState } from '../store/state/file.state'

const mapStateToProps = ({ file }: AppState) => ({ ...file })

interface FileControlProps extends DispatchProps, FileState {}

class FileControl extends React.Component<FileControlProps> {
  public render() {
    const { name, changed } = this.props
    return (
      <div>
        <p>
          <Input
            value={name}
            onChange={this.setFileName}
            addonAfter={FILE_SUFFIX}
          />
        </p>
        <p>
          <Button
            type={changed ? 'primary' : 'default'}
            block
            icon="save"
            onClick={this.save}
          >
            Save
          </Button>
        </p>
        <Upload beforeUpload={this.open} fileList={[]} className="open-file">
          <Button
            type={changed ? 'danger' : 'default'}
            block
            icon="folder-open"
          >
            Open
          </Button>
        </Upload>
        <p>
          <Button
            type={changed ? 'danger' : 'default'}
            block
            icon="file"
            onClick={this.newFile}
          >
            New
          </Button>
        </p>
      </div>
    )
  }

  private setFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.dispatch(fileActions.setFileName(e.target.value))
  }

  private save = () => {
    this.props.dispatch(fileActions.saveFile.request())
  }

  private newFile = () => {
    this.props.dispatch(fileActions.newFile.request())
  }

  private open = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const content = reader.result
      if (typeof content === 'string') {
        this.props.dispatch(
          fileActions.openFile.request({
            name: file.name,
            content
          })
        )
      }
    }
    reader.readAsText(file)
    return false // prevent Upload from doing anything
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileControl)
