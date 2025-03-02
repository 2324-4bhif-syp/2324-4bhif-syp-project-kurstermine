package at.htl.courseschedule.boundary;

import java.util.List;

public final class Role {
    public static final String Organisator = "organisator";
    public static final String Admin = "admin";
    public static final String Instructor = "instructor";
    public static final String Customer = "customer";
    private Role() {}
    public static List<String> EditableRoleNames = List.of(Organisator, Admin, Instructor);
}
