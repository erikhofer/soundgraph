import React from 'react'
import { connect } from 'react-redux'
import { CytoscapeNodeDefinition } from '../graph/Node'
import GraphComponent from '../graph/react/GraphComponent'
import { AppState, DispatchProps, mapDispatchToProps } from '../store'

interface GraphContainerProps extends DispatchProps {
  nodes: CytoscapeNodeDefinition[]
}

const mapStateToProps = ({ nodes }: AppState) => ({ nodes })

class GraphContainer extends React.Component<GraphContainerProps> {
  public render() {
    return <GraphComponent nodes={this.props.nodes} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphContainer)
