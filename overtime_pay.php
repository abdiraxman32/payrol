<?php
session_start();
if (!isset($_SESSION['username'])) {
  header('Location:login.php');
  die();
}

?>

<?php
include 'include/header.php';


?>
<!-- ======= Header ======= -->
<?php
include 'include/nav.php';
?>
<!-- End Header -->

<!-- ======= Sidebar ======= -->
<?php

include 'include/sidebar.php';

?>




<!-- End Sidebar-->

<main id="main" class="main">


  <div class="pagetitle">
    <h1>Dashboard</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>
    </nav>
  </div>

  <div class="container">
    <div class="row justify-content-center mt-4">
      <div class="col-sm-12">
        <div class="card">
          <div class="text-end">
            <button type="button" class="btn btn-success  m-2" data-bs-toggle="modal" data-bs-target="#over_time_modal">
              Add overtime_pay
            </button>
          </div>
          <table class="table" id="overtimeTable">

            <thead>



            </thead>

            <tbody>

              <!-- <tr>
          <td>welcome</td>
          <td>welcome</td>
          <td>welcome</td>
          <td>welcome</td>
          
        </tr>
        <tr>
          <td>welcome</td>
          <td>welcome</td>
          <td>welcome</td>
          <td>welcome</td>
          
        </tr>
        <tr>
          <td>welcome</td>
          <td>welcome</td>
          <td>welcome</td>
          <td>welcome</td>
          
        </tr>
        <tr>
          <td>welcome</td>
          <td>welcome</td>
          <td>welcome</td>
          <td>welcome</td>
          
        </tr> -->


            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- End Page Title -->



</main>


<!-- End #main -->


<div class="modal fade" id="over_time_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">OverTime_pay</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="overtime_payform">
          <input type="hidden" name="update_id" id="update_id">
          <div class="row">



            <div class="col-sm-6">
              <div class="form-group">
                <select name="employee_idd" id="employee_idd" class="form-control mt-2 employee_idd" required>
                  <option value="0">select employee</option>
                </select>
              </div>

            </div>


            <div class="col-sm-6">
              <div class="form-group">
                <select name="month_id" id="month_id" class="form-control mt-2 instructor_name">

                  <option value="0">select month</option>

                </select>
              </div>

            </div>



            <div class="col-sm-12 mt-4">
              <div class="form-group">
                <label for="">overtime_hours</label>
                <input type="number" name="overtime_hours" id="overtime_hours" class="form-control mt-2" required>
              </div>

            </div>




            <div class="col-sm-12">
              <div class="form-group">
                <label for="">overtime_rate</label>
                <input type="number" name="overtime_rate" id="overtime_rate" class="form-control mt-2" readonly>
              </div>

            </div>


            <div class="col-sm-12">
              <div class="form-group">
                <label for="">Total_amount</label>
                <input type="text" name="Total_amount" id="Total_amount" class="form-control mt-2" readonly>
              </div>

            </div>


          </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" name="insert" class="btn btn-primary">Save Info</button>
      </div>
      </form>
    </div>
  </div>
</div>



<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

<?php
include 'include/footer.php';

?>