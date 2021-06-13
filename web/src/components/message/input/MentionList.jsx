import { Component } from 'react'
import UserAvatar from "@/components/user/UserAvatar";

export class MentionList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: 0
    }
  }

  componentDidUpdate(oldProps) {
    if (oldProps.users.length < this.props.selectedIndex + 1) {
      this.setState({
        selectedIndex: oldProps.users.length - 1
      })
    }
  }

  users() {
    return this.props.users
      .filter(user =>
        (typeof user === 'string' ? user.substring(1) : user.username)
          .toLowerCase()
          .startsWith(this.props.query.toLowerCase())
      )
      .slice(0, 5)
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

    if (event.key === ' ' && this.props.query) {
      event.stopPropagation()
      this.spaceHandler()
      return true
    }

    return false
  }

  upHandler() {
    let i = this.state.selectedIndex - 1
    if (i < 0) i = this.users().length - 1
    this.setState({
      selectedIndex: i
    })
  }

  downHandler() {
    let i = this.state.selectedIndex + 1
    if (i >= this.users().length) i = 0
    this.setState({
      selectedIndex: i
    })
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex)
  }

  spaceHandler() {
    this.selectItem(this.state.selectedIndex)
  }

  selectItem(index) {
    const user = this.users()[index]

    if (user) {
      this.props.command(
        typeof user === 'string'
          ? { id: `<${user}>`, name: user.substring(1) }
          : { id: `<@${user.id}>`, name: user.username }
      )
    }
  }

  render() {
    return (
      <div className="relative w-full w-72 rounded-md dark:bg-gray-800 overflow-hidden shadow-lg p-2 border dark:border-gray-850">
        {this.users()
          .map((user, index) => (
            <button
              className={`flex items-center rounded w-full text-left text-primary text-base bg-transparent border-none px-2 h-10 focus:outline-none ${
                index === this.state.selectedIndex ? 'dark:bg-gray-775' : ''
              }`}
              key={typeof user === 'string' ? user : user.id}
              onClick={() => this.selectItem(index)}
              onMouseMove={() => this.setState({
                selectedIndex: index
              })}
            >
              {typeof user === 'string' ? user : <>
              <UserAvatar user={user} size={6} className="mr-2" />
                {user.username}
              </>}
            </button>
          ))}
      </div>
    )
  }
}
