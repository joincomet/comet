import { Component } from 'react'

export class MentionList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: 0
    }
  }

  componentDidUpdate(oldProps) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0
      })
    }
  }

  onKeyDown({ event }) {
    if (event.key === 'ArrowUp') {
      this.upHandler()
      return true
    }

    if (event.key === 'ArrowDown') {
      this.downHandler()
      return true
    }

    if (event.key === 'Enter') {
      event.stopPropagation()
      this.enterHandler()
      return true
    }

    return false
  }

  upHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) %
        this.props.items.length
    })
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length
    })
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex)
  }

  selectItem(index) {
    const item = this.props.items[index]

    if (item) {
      this.props.command({ id: item.user.id })
    }
  }

  render() {
    return (
      <div className="relative w-full rounded dark:bg-gray-700 text-primary overflow-hidden text-sm shadow-md">
        {this.props.items.map((item, index) => (
          <button
            className={`block w-full text-left bg-transparent border-none px-2 py-2 dark:hover:bg-gray-750 ${
              index === this.state.selectedIndex ? 'dark:bg-gray-750' : ''
            }`}
            key={item.user.id}
            onClick={() => this.selectItem(index)}
          >
            {item.name}
          </button>
        ))}
      </div>
    )
  }
}
