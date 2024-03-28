package com.example.e2;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;



public class HelloController {
    public Button rec;
    public Button tri;
    public VBox all;
    public Button ex;

    private Button restart= new Button("restart");

    private Button drawTriangular;
    private Button fScope;


    @FXML
    private Label chooseOption;

    private TextField length;

    private TextField wide;
    private static int len,wid;

    @FXML
    protected void close() {
        System.exit(0);
    }
    @FXML
    protected void rectangle() {
        getData("rec");
    }
   @FXML
    private void triangular(){
        getData("tri");
    }

    //add text fields to get width and length
    private void addTextFields() {
        wide = new TextField();
        length = new TextField();
        all.getChildren().addAll(length,wide);
    }

    //get the length and wide ans sent to tje right method
    private void getData(String s){

        chooseOption.setText("enter length and width");
        all.getChildren().removeAll(rec,tri,ex);
        addTextFields();

        wide.setOnAction(actionEvent ->{ wid=Integer.parseInt(wide.getText());
            len=Integer.parseInt(length.getText());
            all.getChildren().removeAll(length,wide);
            if (s.equals("rec"))
                rectangle(len, wid);
            else
                triangular(len, wid);});
        restart.setOnAction(actionEvent -> restart());
        }

        //return area if this a square or the wis is bigger the length in 5 (length<=2)
        private void rectangle(int len,int wid){
                if(len==wid|| wid-len>5)
                    chooseOption.setText("area:"+len*wid);
                else
                    chooseOption.setText("Scope:"+2*(len+wid));
                all.getChildren().addAll(restart);
    }
    //give the user two options , find a scope or draw it.
    private void triangular(int len,int wid){
         chooseOption.setText("");
        fScope = new Button("find scope");
        drawTriangular = new Button("draw triangular");
        fScope.setOnAction(actionEvent ->scope(len,wid));
        drawTriangular.setOnAction(actionEvent -> draw(len,wid));
        all.getChildren().addAll(fScope,drawTriangular);

    }

    private void draw(int len, int wid) {
        all.getChildren().removeAll(drawTriangular,fScope);
        if(wid%2==0 || wid>2*len)
            chooseOption.setText("this triangular can't be draw");
        else
        {
            String temp="";
            //first floor(floor -The group of lines that are the same number of asterisks)
            for (int l=(wid-1)/2+1;l>0;l--)
                temp+=" ";
            temp+="*";
            StringBuilder str= new StringBuilder("");
            str.append(temp).append("\n");
            for(int i=3;i<wid;i+=2)
            {// i is the number of *  in the line of this floor
                temp=temp.substring(1);//delete blank
                temp+="**";
                for(int j=0;j<(len-2)/((wid-2)/2);j++)//j is the number of lines in every floor
                    str.append(temp).append("\n");
                if(i==3 && (len-2)%((wid-2)/2)!=0)// the leftover we put in the second floor
                    for(int k=0;k<(len-2)%((wid-2)/2);k++)
                        str.append(temp).append("\n");
            }
            if(wid==3 || wid==1)//if wid<3 we need to print * for all the length (besides the end)
                for(int i=0;i<len-2;i++)
                    str.append(temp).append('\n');
            if(wid==1)
                str.append(temp);
            temp=temp.substring(1);
            temp+="**";
            if(wid != 1)
            str.append(temp);
            chooseOption.setText(String.valueOf(str));
        }

        all.getChildren().addAll(restart);
    }
    private void restart(){
        chooseOption.setText("please enter your choice" );
        all.getChildren().addAll(rec,tri,ex);
        all.getChildren().removeAll(restart);
    }

    private void scope(int len,int wid){
        all.getChildren().removeAll(fScope,drawTriangular);
        double a=0.25*wid*wid+len*len;//found the rib with Pythagoras
        a=Math.sqrt(a);
        chooseOption.setText("Scope:"+(2*a+wid));
        all.getChildren().addAll(restart);

    }
}