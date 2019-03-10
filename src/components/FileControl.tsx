import { Button, Input } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { AppState, DispatchProps, mapDispatchToProps } from '../store'
import { fileActions } from '../store/actions'
import { FileState } from '../store/state/file.state'

const mapStateToProps = ({ file }: AppState) => ({ ...file })

interface FileControlProps extends DispatchProps, FileState {}

class FileControl extends React.Component<FileControlProps> {
  public render() {
    const { name, changed } = this.props
    return (
      <div>
        <p>
          <Input value={name} onChange={this.setFileName} addonAfter=".json" />
        </p>
        <p>
          <Button type={changed ? 'primary' : 'default'} block icon="save">
            Save
          </Button>
        </p>
        <p>
          <Button
            type={changed ? 'danger' : 'default'}
            block
            icon="folder-open"
          >
            Open
          </Button>
        </p>
        <p>
          <Button type={changed ? 'danger' : 'default'} block icon="file">
            New
          </Button>
        </p>
      </div>
    )
  }

  private setFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.dispatch(fileActions.setFileName(e.target.value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileControl)
