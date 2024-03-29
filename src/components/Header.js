import ProtoTypes from 'prop-types'
import Button from "./Button"
const Header = ({title,onAdd,showAdd}) =>{

    return(
        <header className='header'>
            <h1> {title}</h1>
            <Button color={showAdd? 'red':'green'} text={showAdd ? 'Close':'Add'} onClick={onAdd}/>

        </header>
    )
}
Header.defaultProps={
    title:'Task Tracker'
}

Header.protoTypes={
    title: ProtoTypes.string.isRequired,
}
//CSS in JS
// const headingStyles={
//     color:'red',
//     backgroundColor:'black'
// }
export default Header