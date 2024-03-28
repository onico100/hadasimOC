module com.example.e2 {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.e2 to javafx.fxml;
    exports com.example.e2;
}