import React from 'react'
import { connect } from 'react-redux'
import { CytoscapeEdgeDefinition, Edge } from '../graph/Edge'
import { CytoscapeNodeDefinition } from '../graph/Node'
import GraphComponent from '../graph/react/GraphComponent'
import { Point } from '../graph/Util'
import { AppState, DispatchProps, mapDispatchToProps } from '../store'
import { edgeActions, nodeActions } from '../store/actions'

interface GraphContainerProps extends DispatchProps {
  nodes: CytoscapeNodeDefinition[]
  edges: CytoscapeEdgeDefinition[]
}

const mapStateToProps = ({ nodes, edges }: AppState) => ({ nodes, edges })

class GraphContainer extends React.Component<GraphContainerProps> {
  public render() {
    return (
      <GraphComponent
        nodes={this.props.nodes}
        edges={this.props.edges}
        setOptions={this.setOptions}
        setPostion={this.setPosition}
        addEdge={this.addEdge}
        deleteNode={this.deleteNode}
        deleteEdge={this.deleteEdge}
      />
    )
  }

  private setOptions = (id: string, options: any) =>
    this.props.dispatch(nodeActions.setNodeOptions.request({ id, options }))

  private addEdge = (edge: Edge) =>
    this.props.dispatch(edgeActions.createEdge.request(edge))

  private setPosition = (id: string, position: Point) =>
    this.props.dispatch(nodeActions.setNodePosition.request({ id, position }))

  private deleteNode = (id: string) =>
    this.props.dispatch(nodeActions.deleteNode.request(id))

  private deleteEdge = (edge: Edge) =>
    this.props.dispatch(edgeActions.deleteEdge.request(edge))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphContainer)
