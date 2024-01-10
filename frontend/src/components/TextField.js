function TextField(props) {
    return <div className="container mt-5 mb-5">
    <h1 className="text-center">{props.header}</h1>
    <p className="text-center mt-5 mb-5 fs-4">{props.text}</p>
    </div>
}

export default TextField;