function QuoteCard(props) {
    const cardStyle = {
        backgroundColor: '#198754',
        borderRadius: '15px',
    }

    return <section class="vh-50 bg-light">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-12 col-xl-5">

        <div class="card text-white" style={cardStyle}>
          <div class="card-body p-5">

            <i class="fas fa-quote-left fa-2x mb-4"></i>

            <p class="lead">{props.quote}</p>

            <hr />

            <div class="d-flex justify-content-between">
              <p class="mb-0">{props.author}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</section>
}

export default QuoteCard