import java.util.Scanner;
public class Main {
    public static void main(String[] args){
        Scanner input=new Scanner(System.in);
        int m=input.nextInt();
        int n=input.nextInt();
        int[][] a=new int[m][n];
        for(int i=0;i<a.length;i++){
            for(int j=0;j<a[i].length;j++){{
                a[i][j]=input.nextInt();
            }
        }
        int top = 0, bottom = a.length - 1;
        int left = 0, right = a[0].length - 1;
        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++) {
                System.out.print(a[top][j] + " ");
            }
            top++;

            for (int j = top; j <= bottom; j++) {
                System.out.print(a[j][right] + " ");
            }
            right--;
            if (top <= bottom) {
                for (int j = right; j >= left; j--) {
                    System.out.print(a[bottom][j] + " ");
                }
                bottom--;
            }
            if (left <= right) {
                for (int j = bottom; j >= top; j--) {
                    System.out.print(a[j][left] + " ");
                }
                left++;
            }
        }
    }
}
}