import { Container } from "react-bootstrap";

function List(props) {
  const columns = ["#", "First", "Last", "Handle"];
  const listItems = columns.map((col, index) => (
    <th key={index} scope="col">
      {col}
    </th>
  ));

  const mappedSelectItems = props.selectItems.map((item, index) => (
    <option key={index} value={index + 1}>
      {item}
    </option>
  ));

  return (
    <Container className="w-75" id={props.scrollId}>
      <h1 className="text-center m-5">{props.header}</h1>
      {props.showSelect && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <select className="form-select w-50" aria-label="Select">
            <option value="0">{props.firstSelectTitle}</option>

            {mappedSelectItems}
          </select>
        </div>
      )}
      <table className="table table-bordered border-success m-5">
        <thead>
          <tr>{listItems}</tr>
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
  );
}

export default List;
