import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import './index.css'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class SlideHome extends Component {
  state = {
    arrayList: initialSlidesList,
    heading: initialSlidesList[0].heading,
    description: initialSlidesList[0].description,
    activeId: initialSlidesList[0].id,
    inputHead: false,
    inputPara: false,
    inputValueHead: '',
    inputValuePara: '',
  }

  renderHeader = () => (
    <nav className="nav-container">
      <img
        className="logo"
        alt="nxt slides logo"
        src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-logo.png"
      />
      <h1 className="logo-text">Nxt Slides</h1>
    </nav>
  )

  onNew = () => {
    const {activeId, arrayList} = this.state
    const getIndex = arrayList.findIndex(eachObj => eachObj.id === activeId)
    const newObject = {
      id: uuid(),
      heading: 'Heading',
      description: 'Description',
    }
    this.setState(prevState => ({
      arrayList: [
        ...prevState.arrayList.slice(0, getIndex + 1),
        newObject,
        ...prevState.arrayList.slice(getIndex + 1),
      ],
      activeId: newObject.id,
      heading: newObject.heading,
      description: newObject.description,
    }))
  }

  onHead = () => {
    const {heading} = this.state
    this.setState({inputHead: true, inputValueHead: heading})
  }

  onPara = () => {
    const {description} = this.state
    this.setState({inputPara: true, inputValuePara: description})
  }

  onInputHead = event => {
    const {activeId} = this.state
    this.setState(prevState => ({
      inputValueHead: event.target.value,
      arrayList: prevState.arrayList.map(eachItem => {
        if (eachItem.id === activeId) {
          return {...eachItem, heading: event.target.value}
        }
        return eachItem
      }),
    }))
  }

  onInputPara = event => {
    const {activeId} = this.state
    this.setState(prevState => ({
      inputValuePara: event.target.value,
      arrayList: prevState.arrayList.map(eachItem => {
        if (eachItem.id === activeId) {
          return {...eachItem, description: event.target.value}
        }
        return eachItem
      }),
    }))
  }

  onBlurHead = () => {
    const {inputValueHead} = this.state
    this.setState({heading: inputValueHead, inputHead: false})
  }

  onBlurPara = () => {
    const {inputValuePara} = this.state
    this.setState({description: inputValuePara, inputPara: false})
  }

  activeTab = eachSlide => {
    this.setState({
      heading: eachSlide.heading,
      description: eachSlide.description,
      activeId: eachSlide.id,
    })
  }

  getClassName = eachSlide => {
    const {activeId, arrayList} = this.state
    const className = activeId === eachSlide.id ? 'slide-active' : 'slide-item'
    const indexNumber = arrayList.indexOf(eachSlide) + 1
    return (
      <li
        className={className}
        key={eachSlide.id}
        onClick={() => this.activeTab(eachSlide)}
        testid={`slideTab${indexNumber}`}
      >
        <p className="index">{indexNumber}</p>
        <div className="slide-content">
          <h1 className="main">{eachSlide.heading}</h1>
          <p className="description">{eachSlide.description}</p>
        </div>
      </li>
    )
  }

  renderList = () => {
    const {arrayList} = this.state
    return (
      <ol className="left-container">
        {arrayList.map(eachSlide => this.getClassName(eachSlide))}
      </ol>
    )
  }

  renderRight = () => {
    const {
      heading,
      description,
      inputHead,
      inputPara,
      inputValuePara,
      inputValueHead,
    } = this.state
    return (
      <div className="right-container">
        {!inputHead && (
          <button className="right-head" onClick={this.onHead} type="button">
            {heading}
          </button>
        )}
        {inputHead && (
          <input
            type="text"
            value={inputValueHead}
            className="input-head"
            onChange={this.onInputHead}
            onBlur={this.onBlurHead}
          />
        )}
        {!inputPara && (
          <button className="right-para" onClick={this.onPara} type="button">
            {description}
          </button>
        )}
        {inputPara && (
          <input
            type="text"
            value={inputValuePara}
            className="input-para"
            onChange={this.onInputPara}
            onBlur={this.onBlurPara}
          />
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        {this.renderHeader()}
        <button className="new" type="button" onClick={this.onNew}>
          <img
            className="plus"
            alt="new plus icon"
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
          />
          <p className="new-text">New</p>
        </button>
        <div className="container">
          {this.renderList()}
          {this.renderRight()}
        </div>
      </div>
    )
  }
}
export default SlideHome
