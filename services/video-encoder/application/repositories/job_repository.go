package repositories

import (
	"fmt"

	"github.com/jinzhu/gorm"
	"github.com/maliciouschool/video-encoder/domain"
	uuid "github.com/satori/go.uuid"
)

type JobRepository interface {
	Find(id string) (*domain.Job, error)
	Insert(job *domain.Job) (*domain.Job, error)
	Update(job *domain.Job) (*domain.Job, error)
}

type JobRepositoryDb struct {
	Db *gorm.DB
}

func (repo JobRepositoryDb) Find(id string) (*domain.Job, error) {
	var job domain.Job
	repo.Db.Preload("Video").First(&job, "id = ?", id)

	if job.ID == "" {
		return nil, fmt.Errorf("job does not exist")
	}

	return &job, nil
}

func (repo JobRepositoryDb) Insert(job *domain.Job) (*domain.Job, error) {
	if job.ID == "" {
		job.ID = uuid.NewV4().String()
	}

	err := repo.Db.Create(job).Error

	if err != nil {
		return nil, err
	}

	return job, nil
}

func (repo JobRepositoryDb) Update(job *domain.Job) (*domain.Job, error) {
	err := repo.Db.Save(&job).Error

	if err != nil {
		return nil, err
	}

	return job, nil
}
