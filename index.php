<?php 
    include('functions.php');
    include('includes/header.php');  


    // AJAX test for auto update without refreshing

    // Have an ajax function that runs at half ten every day that re runs the php database function to get the info again


?>
        <div class="charity-total-container">

            <div class="data-container">

                <div class="hide" id="curr_total"><?php echo x_total("current");?></div>
                <div class="hide" id="prev_total"><?php echo x_total("previous"); ?></div> 
                <div class="hide" id="daily_curr_total"><?php echo x_daily_dontations("current");?></div>
                <div class="hide" id="daily_prev_total"><?php echo x_daily_dontations("previous"); ?></div>

                <!-- These below need fixing so that they are faster overall -->
                <!-- Will need to lower the number of fuckin uh database connections I think / change it from being a recursive function -->

                <div class="hide" id="curr_signups"><?php echo x_num_of_signups("current");?></div>
                <div class="hide" id="prev_signups"><?php echo x_num_of_signups("previous"); ?></div> 
                <div class="hide" id="curr_signups_24"><?php echo x_num_of_signups24("current");?></div>
                <div class="hide" id="prev_signups_24"><?php echo x_num_of_signups24("previous"); ?></div>

            </div>

            <div class="overall-data">
                <p>Total Raised for Charity</p>
                <p class="overall-total"></p>
            </div>
            <div class="multiple-container">

                <div class="small-headers">
                    <p class="">Daily total</p>
                    <p id="daily_overall"><?php //echo"£" . x_daily_dontations("current"); ?></p>
                </div>
                <div class="small-headers">
                    <p class="">Total Signups</p>
                    <p id="signups_total"><?php //echo x_num_of_signups("current"); ?></p>
                </div>
                <div class="small-headers">
                    <p class="">Daily Signups</p>
                    <p id="signups_24"><?php //echo x_num_of_signups24("current"); ?></p>
                </div>
            </div>

            <span id="counter"> <?php //echo"£" . x_total("current");?> </span>
            <!-- <span><?php //echo x_daily_dontations("current") ?></span> -->

        </div>
        <script src="main.js"></script>
        <script src="assets/js/confetti.js"></script>
        <!-- <script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js"></script>  -->
    </body>
</html>