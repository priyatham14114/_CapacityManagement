namespace capacityManagement;


entity Materials {
    key Product        : String;
        MaterialID     : String;
        EAN_UPC        : String;
        SAPProductCode : String;
        Length         : String;
        Width          : String;
        Height         : String;
        Volume         : String;
        GrossWeight    : String;
        NetWeight      : String;
}

// entity Material {
//     key MaterialID : String; // Unique identifier for the material
//     Description : String; // Description of the material
//     UnitOfMeasure : String; // Unit of measure (e.g., kg, liters)
//     ShapeType : ShapeTypes; // Shape Type: can be 'Square', 'Rectangle', 'Cube', 'Cylinder', 'Sphere', or 'Cone'
//     SideLength : Decimal(10,2); // Length of one side in millimeters (for squares and cubes)
//     Length : Decimal(10,2); // Length in millimeters (for rectangles and cylinders)
//     Width : Decimal(10,2); // Width in millimeters (for rectangles)
//     Radius : Decimal(10,2); // Radius in millimeters (for cylinders, spheres, and cones)
//     Thickness : Decimal(10,2); // Thickness in millimeters (for rectangular shapes)
//     Volume : Decimal(10,2); // Volume of the material
// }

//  type ShapeTypes: String enum{
//     Square;
//     Rectangle;
//     Cube;
//     Cylinder;
//     Sphere;
//     Cone;
//  }
