function Footer() {
    const footerStyle = {
        backgroundColor: '#198754',
        color: '#fff',
    }

    return <footer className="bg-body-tertiary text-center text-lg-start">
    <div className="text-center p-3" style={footerStyle}>
      © 2023 Copyright:
      <a className="text-body" href="/"> FitCrafters</a>
    </div>
  </footer>
}
export default Footer