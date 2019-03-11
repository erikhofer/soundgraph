import { Modal, Tree } from 'antd'
import { AntTreeNodeSelectedEvent } from 'antd/lib/tree'
import React from 'react'
import { connect } from 'react-redux'
import { DelayReactComponent } from '../nodes/effects/Delay'
import { GainReactComponent } from '../nodes/effects/Gain'
import { SoundgraphNodeType } from '../nodes/SoundgraphNode'
import { OscillatorReactComponent } from '../nodes/sources/Oscillator'
import { DispatchProps, mapDispatchToProps } from '../store'
import { nodeActions } from '../store/actions'

const { TreeNode, DirectoryTree } = Tree

interface Categories {
  [name: string]: SoundgraphNodeType[]
}

const categories: Categories = {
  Sources: ['Oscillator'],
  Effects: ['Gain', 'Delay'],
  Destinations: ['Speakers']
}

interface NodeLibraryState {
  nodeType?: SoundgraphNodeType
  nodeOptions: any
}

class NodeLibrary extends React.Component<DispatchProps, NodeLibraryState> {
  public state: NodeLibraryState = {
    nodeOptions: {}
  }

  public render() {
    return (
      <div style={{ background: 'white', flexGrow: 1, overflowY: 'auto' }}>
        <DirectoryTree onSelect={this.onSelect} defaultExpandAll>
          {this.renderCategories()}
        </DirectoryTree>
        {this.renderModal()}
      </div>
    )
  }

  private setNodeOptions = (options: any) =>
    this.setState({ nodeOptions: options })

  private renderModal = () => {
    if (!this.state.nodeType) {
      return null
    }
    return (
      <Modal
        title={'Create ' + this.state.nodeType}
        visible
        onOk={this.createNode}
        onCancel={this.closeModal}
      >
        <div>{this.getOptionsUi(this.state.nodeType)}</div>
      </Modal>
    )
  }

  private renderCategories = () => {
    return Object.keys(categories).map(key => (
      <TreeNode title={key} key={key}>
        {categories[key].map(this.renderItem)}
      </TreeNode>
    ))
  }

  private closeModal = () => {
    this.setState({ nodeType: undefined })
  }

  private createNode = () => {
    this.props.dispatch(
      nodeActions.createNode.request({
        type: this.state.nodeType!,
        options: this.state.nodeOptions
      })
    )
    this.closeModal()
  }

  private getOptionsUi(type: SoundgraphNodeType) {
    switch (type) {
      case 'Gain':
        return (
          <GainReactComponent
            options={this.state.nodeOptions}
            setOptions={this.setNodeOptions}
          />
        )
      case 'Delay':
        return (
          <DelayReactComponent
            options={this.state.nodeOptions}
            setOptions={this.setNodeOptions}
          />
        )
      case 'Oscillator':
        return (
          <OscillatorReactComponent
            options={this.state.nodeOptions}
            setOptions={this.setNodeOptions}
          />
        )
      default:
        return null
    }
  }

  private onSelect = (selectedKeys: string[], e: AntTreeNodeSelectedEvent) => {
    if (
      selectedKeys.length !== 1 ||
      Object.keys(categories).indexOf(selectedKeys[0]) > -1
    ) {
      return
    }
    const type = selectedKeys[0] as SoundgraphNodeType
    if (this.getOptionsUi(type) !== null) {
      this.setState({ nodeType: type, nodeOptions: {} })
    } else {
      this.props.dispatch(nodeActions.createNode.request({ type }))
    }
  }

  private renderItem = (type: SoundgraphNodeType) => {
    return <TreeNode key={type} title={type} isLeaf />
  }
}

export default connect(mapDispatchToProps)(NodeLibrary)
