import React from 'react'
import { connect } from 'react-redux'
import { CytoscapeNodeDefinition } from '../graph/Node'
import GraphComponent from '../graph/react/GraphComponent'
import { AppState, DispatchProps, mapDispatchToProps } from '../store'
import { nodeActions } from '../store/actions'

interface GraphContainerProps extends DispatchProps {
  nodes: CytoscapeNodeDefinition[]
}

const mapStateToProps = ({ nodes }: AppState) => ({ nodes })

class GraphContainer extends React.Component<GraphContainerProps> {
  public render() {
    return (
      <GraphComponent nodes={this.props.nodes} setOptions={this.setOptions} />
    )
  }

  private setOptions = (id: string, options: any) =>
    this.props.dispatch(nodeActions.setNodeOptions.request({ id, options }))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphContainer)
