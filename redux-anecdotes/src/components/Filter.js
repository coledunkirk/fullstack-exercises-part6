import { setFilter } from "../reducers/filterReducer"
import { connect } from 'react-redux'

const Filter = ({ filter, setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}
const mapDispatchToProps = {
  setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)