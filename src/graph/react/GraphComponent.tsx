import Cytoscape, { CytoscapeOptions } from 'cytoscape'
import Popper from 'cytoscape-popper'
import { cloneDeep, debounce } from 'lodash'
import React from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { CytoscapeEdgeDefinition, Edge } from '../Edge'
import {
  Cy,
  cytoscapeCxtmenuSettings,
  cytoscapeEdgehandlesSettings,
  cytoscapeStyle
} from '../Graph'
import { CytoscapeNodeDefinition } from '../Node'
import { Point } from '../Util'
import { GraphContext } from './GraphContext'
import PopperWrapper from './PopperWrapper'
import { ReactNode } from './ReactNode'

Cytoscape.use(Popper)

export interface GraphComponentProps {
  nodes: CytoscapeNodeDefinition[]
  edges: CytoscapeEdgeDefinition[]
  /**
   * Called if the `reactComponent` of a `ReactNode` calls `setOptions()`.
   * If not set, `setOptions()` of the node is called directly.
   */
  setOptions?: (id: string, options: any) => void
  addEdge?: (edge: Edge) => void
  setPostion?: (id: string, position: Point) => void
  deleteNode?: (id: string) => void
  deleteEdge?: (edge: Edge) => void
}

export default class GraphComponent extends React.Component<
  GraphComponentProps
> {
  public static readonly contextType = GraphContext

  public context!: React.ContextType<typeof GraphContext>
  private cy: Cy

  private lastEhCompleteTimestamp = 0

  public render() {
    const test = process && process.env && process.env.NODE_ENV === 'test'
    if (test) {
      // https://github.com/plotly/react-cytoscapejs/issues/13
      return null
    }

    const { nodes, edges } = this.props

    const cytoscapeOptions: CytoscapeOptions = {
      elements: nodes.concat(edges),
      pan: { x: 300, y: 300 }
    }

    return (
      <React.Fragment>
        <CytoscapeComponent
          {...cytoscapeOptions}
          stylesheet={cytoscapeStyle}
          cy={this.connectCytoscape}
          style={{ width: '100%', height: '100%' }}
        />
        {this.renderReactNodeComponents()}
      </React.Fragment>
    )
  }

  private renderReactNodeComponents() {
    // At this point we need to access the graph directly in order to retrieve
    // the React components. These cannot be stored in Redux.
    const graph = this.context
    if (graph === null) {
      return null
    }

    const nodes = this.props.nodes
      .filter(node => node.data.root)
      .map(node => graph.getNode(node.data.id!))

    const components: React.ReactNode[] = []
    for (const node of nodes) {
      if (node instanceof ReactNode) {
        if (node.reactComponent) {
          const setOptions = (options: any) =>
            this.props.setOptions
              ? this.props.setOptions(node.id, options)
              : node.setOptions(options)
          components.push(
            <PopperWrapper cy={this.cy} key={node.id} nodeId={node.id}>
              <node.reactComponent
                options={node.options}
                setOptions={setOptions}
              />
            </PopperWrapper>
          )
        }
      }
    }
    return components
  }

  private connectCytoscape = (cy: Cy) => {
    // setState() would refresh the component and we end up here again
    this.cy = cy
    cy.edgehandles(cytoscapeEdgehandlesSettings)
    cy.cxtmenu(cytoscapeCxtmenuSettings.nodes(this.deleteNode))
    cy.cxtmenu(cytoscapeCxtmenuSettings.edges(this.deleteEdge))

    // debounce to only handle final position after drop
    if (this.props.setPostion) {
      cy.on(
        'position',
        'node[root]',
        debounce(event => {
          this.props.setPostion!(
            event.target.data('id'),
            cloneDeep(event.target.position())
          )
        }, 200)
      )
    }

    cy.on('ehcomplete' as any, this.setPosition as any)
  }

  private setPosition = (
    event: any,
    sourceNode: any,
    targetNode: any,
    addedEles: any
  ) => {
    // the event is raised 3 times and _.debounce doesn't work, so we work around this manually
    if (this.lastEhCompleteTimestamp === event.timeStamp) {
      return
    }
    this.lastEhCompleteTimestamp = event.timeStamp
    if (this.props.addEdge) {
      this.props.addEdge({
        sourceNodeId: sourceNode.data('parent'),
        sourceOutputIndex: parseInt(sourceNode.data('id').slice(-1), 10),
        destinationNodeId: targetNode.data('parent'),
        destinationInputIndex: parseInt(targetNode.data('id').slice(-1), 10)
      })
    }
  }

  private deleteNode = (id: string) => {
    if (this.props.deleteNode) {
      this.props.deleteNode(id)
    }
  }

  private deleteEdge = (edge: Edge) => {
    if (this.props.deleteEdge) {
      this.props.deleteEdge(edge)
    }
  }
}
