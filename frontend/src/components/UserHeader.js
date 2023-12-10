import background from "../img/userBackground.jpg"
function UserHeader() {
    return <header>
    <div
      class="p-5 text-center bg-image mask-parent"
      style={{
        backgroundImage: "url(" + background + ")"}}>
      <div class="mask">
        <div class="d-flex justify-content-center align-items-center h-100">
          <div class="text-white">
            <h1 class="mb-3">Witaj *imię*!</h1>
            <h4 class="mb-3">Panel menadżera</h4>
          </div>
        </div>
      </div>
    </div>
  </header>
}

export default UserHeader