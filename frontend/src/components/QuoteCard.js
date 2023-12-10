function QuoteCard(props) {
    const cardStyle = {
        backgroundColor: '#198754',
        borderRadius: '15px',
    }

    return <section className="vh-50 bg-light">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-12 col-xl-5">

        <div className="card text-white" style={cardStyle}>
          <div className="card-body p-5">

            <i className="fas fa-quote-left fa-2x mb-4"></i>

            <p className="lead">{props.quote}</p>

            <hr />

            <div className="d-flex justify-content-between">
              <p className="mb-0">{props.author}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</section>
}

export default QuoteCard