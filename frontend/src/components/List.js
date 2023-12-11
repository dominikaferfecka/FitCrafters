import { Container } from "react-bootstrap";

function List(props) {
    const columns = ["#", "First", "Last", "Handle"];
    const listItems = columns.map((col) =>
        <th scope="col">{col}</th>
    );

    return <Container>
    <h1 class="text-center m-5">
        {props.header}
    </h1>
    <table class="table table-bordered border-success m-5">
    <thead>
      <tr>
        {listItems}
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
    </tbody>
  </table>
  </Container>
}

export default List