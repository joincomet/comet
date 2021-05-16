import { Component } from 'react'

export class MentionList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: 0
    }
  }

  componentDidUpdate(oldProps) {
    if (this.props.users !== oldProps.users) {
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
        (this.state.selectedIndex + this.props.users.length - 1) %
        this.props.users.length
    })
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.users.length
    })
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex)
  }

  selectItem(index) {
    const item = this.props.users[index]

    if (item) {
      this.props.command(
        typeof item === 'string'
          ? { id: `<${item}>`, name: item.substring(1) }
          : { id: `<@${item.user.id}>`, name: item.name }
      )
    }
  }

  render() {
    return (
      <div className="relative w-full w-72 rounded dark:bg-gray-800 text-primary overflow-hidden text-sm shadow-md">
        {this.props.users
          .filter(user =>
            (typeof user === 'string' ? user.substring(1) : user.username)
              .toLowerCase()
              .startsWith(this.props.query.toLowerCase())
          )
          .slice(0, 5)
          .map((user, index) => (
            <button
              className={`block w-full text-left bg-transparent border-none px-2 py-2 dark:hover:bg-gray-775 focus:outline-none ${
                index === this.state.selectedIndex ? 'dark:bg-gray-775' : ''
              }`}
              key={typeof user === 'string' ? user : user.id}
              onClick={() => this.selectItem(index)}
            >
              {typeof user === 'string' ? user : user.username}
            </button>
          ))}
      </div>
    )
  }
}
