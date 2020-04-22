
package pg

import "github.com/flow-thru/flowthru/internal/models"

// OwnersOrganization gathers all of the organizations that belongs to a user.
// It queries for all organizations that belong to a specific owner ID.
// It returns a slice of Organization pointer types if successful, otherwise an error.
func (db *Database) OwnersOrganizations(ownerId int) ([]*models.Organization, error) {
    rows, err := db.Query("SELECT * FROM organization WHERE owner_id = $1", ownerId)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    orgs := make([]*models.Organization, 0)
    for rows.Next() {
        org := new(models.Organization)
        err := rows.Scan(&org.ID, &org.OwnerID, &org.Name)
        if err != nil {
            return nil, err
        }
        orgs = append(orgs, org)
    }
    if err = rows.Err(); err != nil {
        return nil, err
    }
    return orgs, nil
}
