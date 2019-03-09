import { Tree } from 'antd'
import { AntTreeNodeSelectedEvent } from 'antd/lib/tree'
import React from 'react'
import { connect } from 'react-redux'
import { SoundgraphNodeType } from '../nodes/SoundgraphNode'
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

class NodeLibrary extends React.Component<DispatchProps> {
  public render() {
    return (
      <div style={{ background: 'white', margin: 10 }}>
        <DirectoryTree onSelect={this.onSelect}>
          {this.renderCategories()}
        </DirectoryTree>
      </div>
    )
  }

  private renderCategories = () => {
    return Object.keys(categories).map(key => (
      <TreeNode title={key} key={key}>
        {categories[key].map(this.renderItem)}
      </TreeNode>
    ))
  }

  private onSelect = (selectedKeys: string[], e: AntTreeNodeSelectedEvent) => {
    if (
      selectedKeys.length !== 1 ||
      Object.keys(categories).indexOf(selectedKeys[0]) > -1
    ) {
      return
    }
    this.props.dispatch(
      nodeActions.createNode.request(selectedKeys[0] as SoundgraphNodeType)
    )
  }

  private renderItem = (type: SoundgraphNodeType) => {
    return <TreeNode key={type} title={type} isLeaf />
  }
}

export default connect(mapDispatchToProps)(NodeLibrary)
