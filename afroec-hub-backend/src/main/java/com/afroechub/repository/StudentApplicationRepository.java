package com.afroechub.repository;

import com.afroechub.entity.StudentApplication;
import com.afroechub.enums.ApplicationStatus;
import com.afroechub.enums.Gender;
import com.afroechub.enums.ProgramType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentApplicationRepository
        extends JpaRepository<StudentApplication, Long>, JpaSpecificationExecutor<StudentApplication> {

    Optional<StudentApplication> findByIdAndEmailIgnoreCase(Long id, String email);

    long countByStatus(ApplicationStatus status);

    long countByProgramType(ProgramType programType);

    long countByCreatedAtAfter(LocalDateTime dateTime);

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    Page<StudentApplication> findByStatus(ApplicationStatus status, Pageable pageable);

    @Query("SELECT s.programType, COUNT(s) FROM StudentApplication s GROUP BY s.programType")
    List<Object[]> countGroupedByProgramType();

    @Query("SELECT s.gender, COUNT(s) FROM StudentApplication s GROUP BY s.gender")
    List<Object[]> countGroupedByGender();

    @Query("SELECT s.status, COUNT(s) FROM StudentApplication s GROUP BY s.status")
    List<Object[]> countGroupedByStatus();

    long countByGender(Gender gender);
}
