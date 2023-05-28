import styled from "styled-components";
const BodySTY = styled.div``;

const ProfileSTY = styled.div`
  .images {
    position: relative;
    width: 100%;
    height: 400px;
    .profile-picture {
      position: absolute;
      width: 200px;
      height: 200px;
      overflow: hidden;
      border-radius: 50%;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
    }
  }

  .user-info {
    /* height: 180px; */
    box-shadow: 0px 0px 25px -10px ${({ theme }) => theme.primaryPalette.BoxShadow};
    border-radius: ${({ theme }) => theme.borderRadius.Large};
    gap: 20px;
    flex-direction: column;
    margin: 20px 70px;
    padding: 90px 50px 20px 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      .name {
        font-size: ${({ theme }) => theme.fontSize["24"]};
        font-weight: ${({ theme }) => theme.fontWeight["Semi-bold"]};
      }
      .bio {
        padding: 0.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .content {
      width: 100%;
      align-items: flex-start;
      justify-content: space-between;
      display: grid;
      row-gap: 1rem;
      grid-template-columns: repeat(3, 1fr);
      .left {
        display: flex;
        gap: 10px;
        a {
          font-size: ${({ theme }) => theme.fontSize["16"]};
          color: ${({ theme }) => theme.colors["B-Primary"]};
        }
      }

      .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        .info {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .item {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: ${({ theme }) => theme.fontSize["16"]};
            span {
              font-size: 12px;
            }
          }
        }
      }

      .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
      }
    }
    button {
      border: none;
      background-color: ${({ theme }) => theme.colors["B-Primary"]};
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background-color: ${({ theme }) => theme.colors["B-ShadesLight"]};
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.screen.laptop}) {
    .user-info {
      margin: 20px 20px;
      padding: 90px 20px 20px 20px;
    }
    .user-info .content {
      grid-template-columns: repeat(2, 1fr);
      .left {
        grid-column: span 2;
        justify-content: center;
        a {
          font-size: ${({ theme }) => theme.fontSize["20"]};
        }
      }
      .center .info {
        justify-content: flex-start;
        gap: 1rem;
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.screen.tablet}) {
    .images {
      height: 300px;
    }
  }
  @media (max-width: ${({ theme }) => theme.screen.phone}) {
    .images {
      height: 200px;
      .profile-picture {
        width: 150px;
        height: 150px;
      }
    }
    .user-info {
      padding: 70px 20px 20px 20px;
    }
  }
`;
export { BodySTY, ProfileSTY };
