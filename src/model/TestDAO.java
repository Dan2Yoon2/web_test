package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TestDAO {
    String sql = "select * from user";
    Connection conn = DBCP.getConnection();
    ResultSet rs;

    public void select_test() {
        try {
            PreparedStatement psmt = conn.prepareCall(sql);
            rs = psmt.executeQuery();
            while (rs.next()) {
                System.out.println(rs.getString(1));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
