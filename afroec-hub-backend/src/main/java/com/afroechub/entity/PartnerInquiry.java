package com.afroechub.entity;

import com.afroechub.enums.PartnerStatus;
import com.afroechub.enums.PartnerType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "partner_inquiries", indexes = {
        @Index(name = "idx_partner_email", columnList = "email"),
        @Index(name = "idx_partner_status", columnList = "status"),
        @Index(name = "idx_partner_type", columnList = "organization_type")
})
@Getter
@Setter
@NoArgsConstructor
public class PartnerInquiry extends BaseEntity {

    @Column(name = "organization_name", nullable = false, length = 200)
    private String organizationName;

    @Column(name = "contact_person", nullable = false, length = 200)
    private String contactPerson;

    @Column(nullable = false, length = 200)
    private String email;

    @Column(length = 50)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "organization_type", nullable = false, length = 50)
    private PartnerType organizationType;

    @ElementCollection
    @CollectionTable(name = "partner_inquiry_interests",
            joinColumns = @JoinColumn(name = "partner_inquiry_id"))
    @Column(name = "interest")
    private List<String> partnershipInterest = new ArrayList<>();

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private PartnerStatus status = PartnerStatus.NEW;

    @Column(name = "assigned_to", length = 100)
    private String assignedTo;

    @Column(name = "follow_up_date")
    private LocalDate followUpDate;

    @Column(columnDefinition = "TEXT")
    private String notes;
}
